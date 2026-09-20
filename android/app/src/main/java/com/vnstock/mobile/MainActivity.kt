package com.vnstock.mobile

import android.app.Activity
import android.os.Bundle
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder

/**
 * Hosts the single full-screen LynxView the whole app renders into;
 * routing happens inside the bundle (react-router), not here.
 */
class MainActivity : Activity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val lynxView = LynxViewBuilder()
        .setTemplateProvider(AssetsTemplateProvider(this))
        .build(this)
    setContentView(lynxView)

    lynxView.renderTemplateUrl("main.lynx.bundle", "")
  }
}
