from apps.api.routes import (
    login,
    marketplace,
    profile,
    register,
    status,
    tags,
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
    path("upload", upload.post),
    path("tags", tags.tags),
    path("trade", trading.trade),
    path("pendingtrades", profile.trade_requests),
    path("profiledata", profile.get_profile_data),
    path("confirmpendingtrade", profile.confirm_pending_trade),
    path("getpendingtradestatus", profile.get_pending_trade_status),
    path("removependingtrade", profile.remove_pending_trade),
    path("verify", verify.verify),
    path("resendverify", verify.resend_verify),
]
