#Middleware Example

#CookieJWTAuthentication inheriting from JWTAuthentication class provided by Django, refactored to use cookies
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Directly specify the cookie names
        raw_token = request.COOKIES.get('access_token') 
        if not raw_token:
            return None
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except TokenError as e:
            raise exceptions.AuthenticationFailed('Invalid token') from e