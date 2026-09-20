package com.vnstock.mobile

import android.app.Application
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.core.ImagePipelineConfig
import com.facebook.imagepipeline.memory.PoolConfig
import com.facebook.imagepipeline.memory.PoolFactory
import com.lynx.service.http.LynxHttpService
import com.lynx.service.image.LynxImageService
import com.lynx.service.log.LynxLogService
import com.lynx.tasm.LynxEnv
import com.lynx.tasm.service.LynxServiceCenter
import com.lynx.xelement.XElementBehaviors

class VNStockApplication : Application() {

  override fun onCreate() {
    super.onCreate()
    initLynxService()
    // LynxEnv must be initialised before any other Lynx call. Unlike iOS, where the
    // pods self-register, Android needs XElement's behaviours passed in explicitly —
    // without them <input> renders as nothing at all.
    LynxEnv.inst().init(this, null, null, XElementBehaviors())
  }

  private fun initLynxService() {
    val factory = PoolFactory(PoolConfig.newBuilder().build())
    val builder = ImagePipelineConfig.newBuilder(applicationContext).setPoolFactory(factory)
    Fresco.initialize(applicationContext, builder.build())

    LynxServiceCenter.inst().registerService(LynxImageService.getInstance())
    LynxServiceCenter.inst().registerService(LynxLogService)
    LynxServiceCenter.inst().registerService(LynxHttpService)
  }
}
