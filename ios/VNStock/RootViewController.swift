import UIKit

/// Hosts the single full-screen LynxView the whole app renders into;
/// routing happens inside the bundle (react-router), not here.
class RootViewController: UIViewController {
  private var lynxView: LynxView?

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .white

    let lynxView = LynxView { builder in
      builder.config = LynxConfig(provider: BundleTemplateProvider())
      builder.screenSize = self.view.frame.size
      builder.fontScale = 1.0
    }
    lynxView.layoutWidthMode = .exact
    lynxView.layoutHeightMode = .exact
    lynxView.frame = view.bounds
    lynxView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

    view.addSubview(lynxView)
    self.lynxView = lynxView

    // "main.lynx" + the provider's `ofType: "bundle"` resolves to main.lynx.bundle.
    lynxView.loadTemplate(fromURL: "main.lynx", initData: nil)
  }

  override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()
    guard let lynxView else { return }
    lynxView.preferredLayoutWidth = view.bounds.width
    lynxView.preferredLayoutHeight = view.bounds.height
    lynxView.triggerLayout()
  }
}
