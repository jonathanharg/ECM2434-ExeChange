from apps.api.routes import (
    constants,
    login,
    marketplace,
    notify,
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
    path("products", marketplace.marketplace),
    path("marketplace", marketplace.marketplace),
    path("upload", upload.upload),
    path("tags", constants.tags),
    path("locations", constants.locations),
    path("profiledata", profile.get_profile_data),
    path("getnotifications", notify.get_user_notifications),
    path("trade/new", trading.request_trade),
    path("trade/all", trading.get_trades),
    path("trade/<int:trade_id>/reject", trading.reject_trade),
    path("trade/<int:trade_id>/accept", trading.accept_trade),
    path("trade/<int:trade_id>/arrived", trading.arrived),
    path("trade/<int:trade_id>/confirm", trading.confirm),
    path("verify", verify.verify),
    path("resendverify", verify.resend_verify),
]
