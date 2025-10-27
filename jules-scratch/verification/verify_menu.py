from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("file:///app/index.html")
        page.screenshot(path="jules-scratch/verification/verification-before.png")
        page.click(".header-menu__button")
        page.screenshot(path="jules-scratch/verification/verification-after.png")
        browser.close()

run()
