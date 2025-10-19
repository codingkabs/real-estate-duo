import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/signup-buyer')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">Ownsel – Terms of Use</h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 18, 2025</p>

          <p className="text-base leading-relaxed mb-6">
            Welcome to Ownsel.com ("Ownsel," "we," "our," or "us"). These Terms of Use ("Terms") govern your access to and use of the Ownsel website, mobile app, and related services (collectively, the "Platform"). By creating an account, listing a property, or using any part of Ownsel, you agree to these Terms and our Privacy Policy. If you do not agree, please do not use Ownsel.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Platform Purpose</h2>
            <p className="text-base leading-relaxed mb-3">
              Ownsel provides online tools and resources that allow homeowners to list and sell their properties directly to buyers ("For Sale By Owner" or "FSBO") and for buyers to discover, inquire, and communicate with sellers.
            </p>
            <p className="text-base leading-relaxed">
              Ownsel is not a licensed real estate broker, agent, or legal advisor. All real estate transactions and communications are conducted directly between users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p className="text-base leading-relaxed">
              You must be at least 18 years old and able to enter a legally binding contract to use Ownsel. By using the Platform, you represent that all information you provide is true, accurate, and complete.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p className="text-base leading-relaxed mb-3">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Provide accurate and updated information;</li>
              <li>Keep your login credentials secure;</li>
              <li>Not share your account with others or allow unauthorized access.</li>
            </ul>
            <p className="text-base leading-relaxed">
              Ownsel reserves the right to suspend or terminate any account that violates these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Content and Listings</h2>
            <p className="text-base leading-relaxed mb-3">
              When you post or upload property information, images, videos, descriptions, or other content ("User Content"), you:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Retain ownership of your content;</li>
              <li>Grant Ownsel a worldwide, non-exclusive, royalty-free license to host, display, and distribute it for the purpose of operating, promoting, and improving the Platform;</li>
              <li>Represent that you have the rights and permissions to post such content and that it is truthful and accurate to the best of your knowledge.</li>
            </ul>
            <p className="text-base leading-relaxed mb-3">
              You may not upload or share any content that is:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>False, misleading, or fraudulent;</li>
              <li>Infringing upon another's intellectual property rights;</li>
              <li>Offensive, discriminatory, or unlawful.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Fees and Payments</h2>
            <p className="text-base leading-relaxed mb-3">
              Some Ownsel services may require payment (e.g., premium listing packages, professional photo upgrades, or MLS exposure).
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All fees are disclosed before purchase and are non-refundable unless otherwise stated.</li>
              <li>You authorize Ownsel to charge your payment method for the selected services.</li>
              <li>Ownsel may change pricing or introduce new fees at any time, with notice.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
            <p className="text-base leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Use the Platform for unlawful purposes or to defraud others;</li>
              <li>Collect or harvest other users' data without consent;</li>
              <li>Interfere with or disrupt the operation of the Platform;</li>
              <li>Attempt to copy, reverse engineer, or resell any part of Ownsel's technology;</li>
              <li>Post spam or solicit unrelated services (e.g., mortgage offers, outside listings).</li>
            </ul>
            <p className="text-base leading-relaxed">
              Violations may result in immediate account termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Sources and Accuracy</h2>
            <p className="text-base leading-relaxed">
              Property data displayed on Ownsel may include third-party or public records. While we strive for accuracy, Ownsel does not guarantee the completeness or correctness of any data including pricing, ownership, tax records, or valuations. Users should independently verify all information before making any transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p className="text-base leading-relaxed mb-3">
              Ownsel is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding:
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>The accuracy, reliability, or availability of the Platform or property listings;</li>
              <li>The outcome of any property transaction;</li>
              <li>Any third-party content or linked sites.</li>
            </ul>
            <p className="text-base leading-relaxed">
              You use the Platform at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-base leading-relaxed mb-3">
              To the maximum extent permitted by law, Ownsel, its affiliates, and its officers are not liable for any indirect, incidental, special, or consequential damages, including lost profits, data loss, or property disputes arising from use of the Platform.
            </p>
            <p className="text-base leading-relaxed">
              Our total liability to you will not exceed the amount you paid (if any) for Ownsel services in the previous 12 months.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-base leading-relaxed mb-3">
              You agree to indemnify and hold harmless Ownsel, its affiliates, and their officers, directors, and employees from any claims, losses, damages, or expenses (including attorney fees) arising out of:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Platform;</li>
              <li>Your violation of these Terms;</li>
              <li>Your posted content or conduct in connection with other users.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Privacy</h2>
            <p className="text-base leading-relaxed">
              Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, and protect user data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
            <p className="text-base leading-relaxed">
              Ownsel may suspend or terminate your access at any time for violations of these Terms or misuse of the Platform. Upon termination, your license to use the Platform ends immediately, and you must stop using all Ownsel services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Intellectual Property</h2>
            <p className="text-base leading-relaxed">
              All content, trademarks, design, and code on the Platform (except User Content) are the exclusive property of Ownsel. You may not copy, distribute, or create derivative works without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Third-Party Links and Integrations</h2>
            <p className="text-base leading-relaxed mb-3">
              Ownsel may use or display third-party data (e.g., Google Maps, Estated API). Each provider's terms and policies apply to your use of their data.
            </p>
            <p className="text-base leading-relaxed">
              Ownsel is not responsible for any third-party sites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
            <p className="text-base leading-relaxed">
              We may update these Terms occasionally. When we do, we will post the updated version with the new "Last Updated" date. Continued use of Ownsel after any update constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Governing Law</h2>
            <p className="text-base leading-relaxed mb-3">
              These Terms are governed by the laws of the State of [Your State, e.g., Georgia or Delaware], without regard to conflict of laws.
            </p>
            <p className="text-base leading-relaxed">
              You agree to submit to the exclusive jurisdiction of the state and federal courts located in that state.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
            <p className="text-base leading-relaxed mb-3">
              For questions or legal inquiries, contact:
            </p>
            <p className="text-base leading-relaxed">
              Ownsel Legal Department<br />
              📧 support@ownsel.com<br />
              🌐 www.ownsel.com
            </p>
          </section>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <p className="text-base leading-relaxed font-medium">
              ✅ By signing up or using Ownsel, you acknowledge that you have read, understood, and agreed to these Terms of Use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
