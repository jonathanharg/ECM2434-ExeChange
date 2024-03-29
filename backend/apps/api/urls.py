from apps.api.routes import (
    constants,
    login,
    marketplace,
    profile,
    register,
    status,
    trading,
    upload,
    verify,
)
from django.urls import path

urlpatterns = [
    path("status", status.status),
    path("login", login.login),
    path("register", register.register),
    path("profile/<str:username>", profile.get_profile_data),
    path("deleteitem", profile.deleteImg),
    path("getachievements", profile.get_achievements),
    path("marketplace", marketplace.marketplace),
    path("upload", upload.upload),
    path("tags", constants.tags),
    path("locations", constants.locations),
    path("profiledata", profile.get_my_profile_data),
    path("trade/new", trading.request_trade),
    path("trade/all", trading.get_trades),
    path("trade/<int:trade_id>/reject", trading.reject_trade),
    path("trade/<int:trade_id>/accept", trading.accept_trade),
    path("trade/<int:trade_id>/arrived", trading.arrived),
    path("trade/<int:trade_id>/confirm", trading.confirm),
    path("verify", verify.verify),
    path("resendverify", verify.resend_verify),
]
