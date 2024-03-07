#Examples of custom views needed to handle the HTTPOnly cookie based authentication scheme 


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        # logger.info(f"Received Signup Request: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response = Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
            response.set_cookie(
                'access_token',
                str(refresh.access_token),
                httponly=True,
                max_age=3600,  # Adjust as needed
                samesite='Lax',
                secure=True,  # Set to False if not using HTTPS locally
                path='/',
            )
            response.set_cookie(
                'refresh_token',
                str(refresh),
                httponly=True,
                max_age=86400,  # Adjust as needed
                samesite='Lax',
                secure=True,  # Set to False if not using HTTPS locally
                path='/',
            )
            return response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:  # Token created successfully
            access_token = response.data['access']
            refresh_token = response.data['refresh']
            response.set_cookie(
                'access_token', 
                access_token, 
                httponly=True, 
                max_age=3600, 
                samesite='Lax'
            )
            response.set_cookie(
                'refresh_token', 
                refresh_token, 
                httponly=True, 
                samesite='Lax'
            )
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        request.data['refresh'] = request.COOKIES.get('refresh_token')
        try:
            # Attempt to refresh the token using the parent class's logic
            response = super().post(request, *args, **kwargs)
            
            if response.status_code == 200:
                # If token refresh is successful, update the access token cookie
                access_token = response.data['access']
                response.set_cookie(
                    'access_token', access_token, httponly=True, samesite='Lax'
                )
            return response
        
        except Exception as e:
            # Handle specific exceptions here as needed
            # For a generic catch-all, return a custom error response
            return Response({
                "error": "refresh_token_expired",
                "detail": "The refresh token is expired or invalid. Please login again."
            }, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    response = JsonResponse({'message': 'Logout successful'})
    response.delete_cookie('access_token', path='/')
    response.delete_cookie('refresh_token', path='/')
    response.delete_cookie('csrftoken', path='/')
    return response
