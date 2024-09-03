const Footer = () => {
    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl d-flex flex-wrap justify-content-center py-2 flex-sm-column flex-row">
              <div className="mb-2 mb-md-0 text-primary">
                ©
                  {(new Date().getFullYear())}
                , kalaitu.dev x delapandelapanlogistics
              </div>
            </div>
          </footer>
      );
}
export default Footer;