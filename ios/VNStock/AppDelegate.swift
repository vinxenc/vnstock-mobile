import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    // LynxEnv must be initialised before any other Lynx call.
    LynxEnv.sharedInstance()

    let window = UIWindow(frame: UIScreen.main.bounds)
    window.rootViewController = RootViewController()
    window.makeKeyAndVisible()
    self.window = window
    return true
  }
}
