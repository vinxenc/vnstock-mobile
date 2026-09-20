plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
}

// Keep in sync with ios/Podfile and with @lynx-js/types in package.json —
// the bundle's engine version and the host engine must match.
val lynxVersion = "4.1.0"
val primjsVersion = "4.1.1"

android {
  namespace = "com.vnstock.mobile"
  compileSdk = 35

  defaultConfig {
    applicationId = "com.vnstock.mobile"
    minSdk = 24
    targetSdk = 35
    versionCode = 1
    versionName = "1.0"
  }

  buildTypes {
    release {
      isMinifyEnabled = true
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  kotlinOptions {
    jvmTarget = "17"
  }
}

dependencies {
  implementation("org.lynxsdk.lynx:lynx:$lynxVersion")
  implementation("org.lynxsdk.lynx:lynx-jssdk:$lynxVersion")
  implementation("org.lynxsdk.lynx:lynx-trace:$lynxVersion")
  implementation("org.lynxsdk.lynx:primjs:$primjsVersion")

  implementation("org.lynxsdk.lynx:lynx-service-image:$lynxVersion")
  implementation("org.lynxsdk.lynx:lynx-service-log:$lynxVersion")
  implementation("org.lynxsdk.lynx:lynx-service-http:$lynxVersion")

  // LynxImageService is built on Fresco.
  implementation("com.facebook.fresco:fresco:2.3.0")
  implementation("com.facebook.fresco:animated-gif:2.3.0")
  implementation("com.facebook.fresco:animated-webp:2.3.0")
  implementation("com.facebook.fresco:webpsupport:2.3.0")
  implementation("com.facebook.fresco:animated-base:2.3.0")
  implementation("com.squareup.okhttp3:okhttp:4.9.0")

  // XElement backs <input>, which the auth screens use via lynx-ui's Input.
  implementation("org.lynxsdk.lynx:xelement:$lynxVersion")
  implementation("org.lynxsdk.lynx:xelement-input:$lynxVersion")
}
