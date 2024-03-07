@login_required
def subforums_like(request, subforum_id): 
    subforum = Subforum.objects.get(id=subforum_id)
    print(f'subforum: {subforum} ')
    try:
        subforum_like = Subforum_Likes.objects.get(subforum=subforum, user=request.user)
        print(f'subforum_like: {subforum_like} ')
        subforum_like.delete()
        is_liked=False
    except Subforum_Likes.DoesNotExist:
        Subforum_Likes.objects.create(subforum=subforum, user=request.user)
        is_liked=True
    likes = len(Subforum_Likes.objects.filter(subforum=subforum_id))
    return JsonResponse({"success": True, 'likes': likes, 'is_liked': is_liked})