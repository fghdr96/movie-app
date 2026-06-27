import { FooterContainer, FooterLinks, FooterText } from "./footerStyles";
import { GitHub, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <>
      <FooterContainer>
        <FooterLinks>
          <a
            href="https://www.linkedin.com/in/farnaz-ghadiri/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", transition: "0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <LinkedIn fontSize="medium" />
          </a>

          <a
            href="https://github.com/fghdr96"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", transition: "0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <GitHub fontSize="medium" />
          </a>
        </FooterLinks>

        <FooterText>&copy; 2025 FGH — Movie App Project</FooterText>
      </FooterContainer>
    </>
  );
}
