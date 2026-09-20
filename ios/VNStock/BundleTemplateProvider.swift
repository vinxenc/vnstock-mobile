import Foundation

/// Serves the Lynx bundle that `pnpm ios:bundle` copies into the app's resources.
/// Lynx has no loader of its own, so every `loadTemplate(fromURL:)` lands here.
class BundleTemplateProvider: NSObject, LynxTemplateProvider {
  func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
    guard let path = Bundle.main.path(forResource: url, ofType: "bundle") else {
      callback(
        nil,
        NSError(
          domain: "com.vnstock.mobile", code: 404,
          userInfo: [NSLocalizedDescriptionKey: "Bundle not found: \(url ?? "nil")"]))
      return
    }

    do {
      callback(try Data(contentsOf: URL(fileURLWithPath: path)), nil)
    } catch {
      callback(nil, error)
    }
  }
}
