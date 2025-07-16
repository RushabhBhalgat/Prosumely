import Link from 'next/link'
const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for Prosumely</h1>

      <p className="mb-6">
        This Privacy Policy ("Policy") describes how Prosumely ("we," "us," or "our") collects,
        uses, and protects the personal information you ("you" or "user") provide when using our
        resume writing services ("Services"). We are committed to safeguarding your privacy and
        ensuring the security of your personal information. By using our Services, you consent to
        the practices described in this Policy.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-2">
          1.1 Personal Information: We may collect personal information, such as your name, email
          address, phone number, and other contact details when you voluntarily provide them to us.
        </p>
        <p className="mb-2">
          1.2 Resume Information: To provide our Services, we may collect information related to
          your resume, including your work experience, educational background, skills, and any other
          details you choose to share.
        </p>
        <p className="mb-2">
          1.3 Payment Information: If you make a payment for our Services, we may collect payment
          details, such as credit card information, billing address, or other financial information
          necessary to process your payment securely.
        </p>
        <p className="mb-2">
          1.4 Website Usage Information: We may collect information about your interaction with our
          website, including your IP address, browser type, device information, and pages visited,
          to improve our website and enhance your user experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
        <p className="mb-2">
          2.1 We use the collected information to provide, maintain, and improve our Services and to
          communicate with you regarding your resume writing needs.
        </p>
        <p className="mb-2">
          2.2 Personal information, such as your name and contact details, may be used to respond to
          your inquiries, process your orders, and deliver the requested Services.
        </p>
        <p className="mb-2">
          2.3 We may use your email address to send you updates, promotions, and other relevant
          information about our Services. You can opt-out of receiving these communications at any
          time.
        </p>
        <p className="mb-2">
          2.4 Payment information is used solely for processing payments and preventing fraudulent
          activities.
        </p>
        <p className="mb-2">
          2.5 We may use website usage information to analyze trends, administer our website, track
          user activity, and gather demographic information for internal purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Retention</h2>
        <p className="mb-2">
          3.1 We retain your personal information for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, unless a longer retention period is required or permitted
          by law.
        </p>
        <p className="mb-2">
          3.2 If you request the deletion of your personal information, we will take reasonable
          steps to remove it from our systems, unless we are required to retain it for legal or
          legitimate business purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Protection of Information</h2>
        <p className="mb-2">
          4.1 We implement appropriate security measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction.
        </p>
        <p className="mb-2">
          4.2 We use industry-standard encryption and secure socket layer (SSL) technology to
          protect your payment information during transmission.
        </p>
        <p className="mb-2">
          4.3 While we strive to protect your personal information, no method of transmission over
          the Internet or electronic storage is entirely secure. Therefore, we cannot guarantee its
          absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Sharing of Information</h2>
        <p className="mb-2">
          5.1 We do not sell, trade, or rent your personal information to third parties for their
          marketing purposes.
        </p>
        <p className="mb-2">
          5.2 We may share your personal information with trusted third-party service providers who
          assist us in delivering our Services, such as payment processors or email service
          providers. These service providers are contractually obligated to protect your information
          and use it solely for the purposes of providing the requested services.
        </p>
        <p className="mb-2">
          5.3 We may disclose your personal information if required by law or if we believe that
          such action is necessary to comply with legal obligations, protect our rights or property,
          or prevent fraud or illegal activities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
        <p className="mb-2">
          6.1 Our website may contain links to third-party websites or services. We are not
          responsible for the privacy practices or the content of such websites. We encourage you to
          review the privacy policies of those third parties before providing any personal
          information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
        <p className="mb-2">
          7.1 Our Services are not intended for individuals under the age of 16. We do not knowingly
          collect personal information from children. If you believe that we have inadvertently
          collected personal information from a child, please contact us, and we will take steps to
          delete the information promptly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
        <p className="mb-2">
          8.1 You have the right to access, update, correct, or delete your personal information. If
          you would like to exercise any of these rights or have any questions or concerns about
          your personal information, please contact us using the information provided below.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Changes to this Privacy Policy</h2>
        <p className="mb-2">
          9.1 We reserve the right to modify or update this Privacy Policy at any time. Any changes
          will be effective immediately upon posting the updated Policy on our website. We encourage
          you to review this Policy periodically for any changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
        <p className="mb-2">
          10.1 If you have any questions, concerns, or requests regarding this Privacy Policy or our
          data practices, please contact us.
        </p>
      </section>

      <div className="mt-8 border-t pt-6">
        <p className="mb-4">
          If you have any questions or concerns regarding our Privacy Policy, please{' '}
          <Link href="/contact">
            <span className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              Contact Us
            </span>
          </Link>
        </p>
        <p className="text-sm text-gray-600">This Privacy Policy was last updated on 27-06-2025.</p>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Privacy Policy | Prosumely Resume Writing Services',
  description:
    'Read the privacy policy for Prosumely’s resume writing services. Learn how we protect your data and ensure confidentiality for all job seekers and clients.',
  keywords: [
    'privacy policy',
    'resume writing privacy',
    'data protection',
    'Prosumely',
    'job seeker privacy',
    'confidential resume writing',
  ],
  openGraph: {
    title: 'Privacy Policy | Prosumely Resume Writing Services',
    description:
      'Read the privacy policy for Prosumely’s resume writing services. Learn how we protect your data and ensure confidentiality for all job seekers and clients.',
    url: 'https://prosumely.com/privacy-policy',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Prosumely Resume Writing Services',
    description:
      'Read the privacy policy for Prosumely’s resume writing services. Learn how we protect your data and ensure confidentiality for all job seekers and clients.',
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/privacy-policy',
  },
}

export default PrivacyPolicyPage
