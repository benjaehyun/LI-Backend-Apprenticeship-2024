class CheckGroup(permissions.BasePermission):
    _group_name = None

    @classmethod
    def for_group(cls, group_name):
        cls._group_name = group_name
        return cls

    def has_permission(self, request, view):
        if not self._group_name:
            return False  # Default to False if no group name is set
        return request.user.groups.filter(name=self._group_name).exists()