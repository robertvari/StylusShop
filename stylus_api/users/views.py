from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import ProfileSerializer


class ProfileView(APIView):
    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user.profile, context={"request": request})
        return Response({
            "email": user.email,
            "profile": serializer.data,
            "orders": []
        })

    def patch(self, request):
        user = request.user
        serializer = ProfileSerializer(user.profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response("Something went wrong...")