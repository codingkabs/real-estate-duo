import { Youtube, Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact</h3>
            <p className="text-muted-foreground">📧 info@linkfsbo.com</p>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-foreground transition">Home</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">How It Works</a></li>
              <li><a href="#mls-exposure" className="text-muted-foreground hover:text-foreground transition">MLS Exposure</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition">FAQ</a></li>
              <li><a href="/login" className="text-muted-foreground hover:text-foreground transition">Login</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-foreground transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center">
          <p className="text-muted-foreground italic mb-2">
            💬 "Your Home. Your Deal. Your Commission."
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
