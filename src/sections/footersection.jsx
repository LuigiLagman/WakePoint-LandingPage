import companyIcon from "../assets/images/company_icon.png";

function FooterSection() {
  return (
    <footer
      id="footer"
      className="flex flex-row items-start bg-gradient-to-b from-transparent to-[#B3EA63] lg:items-center"
    >
      <div className="ml-30">
        <img src={companyIcon} alt="WakePoint company icon" className="w-68 h-auto"/>
      </div>

      <div className="flex flex-row ml-30 justify-between gap-40">
        <div>
          <p className="text-sm font-bold text-[#2A3435]">
            Company
          </p>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              About Us
            </p>
          </a>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              Contact Us
            </p>
          </a>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              FAQs
            </p>
          </a>
        </div>
        <div>
          <p className="text-sm font-bold text-[#2A3435]">
            Resources
          </p>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              Privacy Policy
            </p>
          </a>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              Terms & Conditions
            </p>
          </a>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              Support Center
            </p>
          </a>
        </div>
        <div>
          <p className="text-sm font-bold text-[#2A3435]">
            Community
          </p>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              GitHub
            </p>
          </a>
          <a>
            <p className="text-sm text-[#2A3435] hover:text-[#637677] cursor-pointer">
              Discord
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;