# LYNX START — from the Lynx integration guide; keep in sync with upstream.
-dontwarn android.support.annotation.Keep
-keep @android.support.annotation.Keep class **
-keep @android.support.annotation.Keep class ** {
    @android.support.annotation.Keep <fields>;
    @android.support.annotation.Keep <methods>;
}
-dontwarn androidx.annotation.Keep
-keep @androidx.annotation.Keep class **
-keep @androidx.annotation.Keep class ** {
    @androidx.annotation.Keep <fields>;
    @androidx.annotation.Keep <methods>;
}
# native method call
-keepclasseswithmembers,includedescriptorclasses class * {
    native <methods>;
}
-keepclasseswithmembers class * {
    @com.lynx.tasm.base.CalledByNative <methods>;
}
-keepclasseswithmembers class * {
    @com.lynx.jsbridge.LynxMethod <methods>;
}
-keepclassmembers class * {
    @com.lynx.tasm.behavior.LynxProp <methods>;
    @com.lynx.tasm.behavior.LynxPropGroup <methods>;
    @com.lynx.tasm.behavior.LynxUIMethod <methods>;
}
-keepclassmembers class com.lynx.tasm.behavior.ui.UIGroup {
    public boolean needCustomLayout();
}
# mLoader is unused from Java and held as a WeakRef in JNI; R8 must not drop it.
-keepclassmembers class com.lynx.tasm.LynxTemplateRender {
    private com.lynx.tasm.core.resource.LynxResourceLoader mLoader;
    private com.lynx.tasm.core.resource.LynxResourceLoader mResourceLoader;
}
-keep class com.lynx.tasm.behavior.** { *; }
# LYNX END
