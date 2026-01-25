import React from "react";

const DisclaimerPage = () => {
    return (
        <div  className="bg-white">
            {/* Header Section */}
            <div  className="bg-[#f0f8ff] py-12 px-6 lg:px-32 text-center">
                <div  className="max-w-[1280px] mx-auto p-6 md:p-10">
                    <h1  className="text-4xl  font-extrabold text-[#004C78] mb-4">
                        Disclaimer
                    </h1>
                    <p  className="text-gray-700 text-lg leading-relaxed">
                        Learn about the guidelines and limitations regarding the content on
                        our website.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div  className="max-w-[600px] md:max-w-[900px] lg:max-w-[900px] xl:max-w-[900px] 2xl:max-w-[900px] mx-auto p-4 pt-8 justify-start text-start">
                {/* Introduction */}
                <section  className="mb-8">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">
                        Disclaimer for Molecular Hydrogen Institute
                    </h2>
                    <p  className="text-gray-700 leading-relaxed">
                        If you require any more information or have any questions about our
                        site’s disclaimer, please feel free to contact us by email at
                        <a
                            href="mailto:courses@molecularhydrogeninstitute.org"
                             className="text-[#346896] underline ml-1"
                        >
                            courses@molecularhydrogeninstitute.org
                        </a>
                        . Our Disclaimer was generated with the help of the <a
                            href="https://www.disclaimergenerator.net/"
                             className="text-[#346896] underline ml-1"
                        >
                            Free Disclaimer Generator.
                        </a> 
                    </p>
                </section>

                {/* General Disclaimer */}
                <section  className="mb-8">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">
                        Disclaimers for Molecular Hydrogen Institute
                    </h2>
                    <p  className="text-gray-700 leading-relaxed mb-4">
                        All the information on this website –
                        <a
                            href="https://molecularhydrogeninstitute.org/"
                             className="text-[#346896] underline"
                        >
                            https://molecularhydrogeninstitute.org/
                        </a>
                        – is published in good faith and for general information purpose
                        only. Molecular Hydrogen Institute does not make any warranties
                        about the completeness, reliability and accuracy of this
                        information. Any action you take upon the information you find on
                        this website (Molecular Hydrogen Institute), is strictly at your
                        own risk. Molecular Hydrogen Institute will not be liable for any
                        losses and/or damages in connection with the use of our website.
                    </p>
                    <p  className="text-gray-700 leading-relaxed mb-4">
                        rom our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone ‘bad’.
                    </p>
                    <p  className="text-gray-700 leading-relaxed mb-4">
                        Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their “Terms of Service” before engaging in any business or uploading any information.
                    </p>
                </section>

                {/* Consent Disclaimer */}
                <section  className="mb-8">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">
                        Consent
                    </h2>
                    <p  className="text-gray-700 leading-relaxed mb-4">
                        By using our website, you hereby consent to our disclaimer and agree to its terms.
                    </p>
                </section>

                {/* Update Disclaimer */}
                <section  className="mb-8">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">
                        Update
                    </h2>
                    <p  className="text-gray-700 leading-relaxed mb-4">
                        Should we update, amend or make any changes to this document, those changes will be prominently posted here.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default DisclaimerPage