package com.vnstock.mobile

import android.content.Context
import com.lynx.tasm.provider.AbsTemplateProvider

/**
 * Serves the Lynx bundle that `pnpm bundle:copy` drops into src/main/assets.
 * Lynx has no loader of its own, so every renderTemplateUrl call lands here.
 */
class AssetsTemplateProvider(context: Context) : AbsTemplateProvider() {
  private val appContext = context.applicationContext

  override fun loadTemplate(uri: String, callback: Callback) {
    Thread {
      try {
        appContext.assets.open(uri).use { callback.onSuccess(it.readBytes()) }
      } catch (e: Exception) {
        callback.onFailed(e.message ?: "Failed to read asset: $uri")
      }
    }.start()
  }
}
