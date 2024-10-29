import Image from "next/image";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import NavbarAfterLogin from "@/components/NavbarAfterLogin";

export default function About() {

    const token = cookies().get("token");
    const teamMembers = [
        { name: "Ravi Zarazka Putra", role: "CEO", image: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1729991128/425780296_751165570273522_5112814981647967551_n_vtjc9n.jpg" },
        {
            name: "Ravi Zarazka Putra",
            role: "CTO",
            image: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1729991128/425780296_751165570273522_5112814981647967551_n_vtjc9n.jpg?height=200&width=200",
        },
        {
            name: "Ravi Zarazka Putra",
            role: "Lead Developer",
            image: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1729991128/425780296_751165570273522_5112814981647967551_n_vtjc9n.jpg?height=200&width=200",
        },
        {
            name: "Ravi Zarazka Putra",
            role: "Designer",
            image: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1729991128/425780296_751165570273522_5112814981647967551_n_vtjc9n.jpg?height=200&width=200",
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-black text-gray-300">
                {token ? <NavbarAfterLogin /> : <Navbar />}
                <main className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-center mb-8 text-white">
                        About Our Company
                    </h1>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-100">
                            Our Story
                        </h2>
                        <p className="mb-4">
                            Founded in 2024, our company has been at the forefront of
                            innovation in the tech industry. We strive to create products that
                            make a difference in people&apos;s lives and push the boundaries of
                            what&apos;s possible.
                        </p>
                        <p>
                            Our team of dedicated professionals works tirelessly to ensure
                            that we deliver the highest quality solutions to our clients.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-100">
                            Our Mission
                        </h2>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                            &quot;To empower businesses and individuals through innovative
                            technology solutions, fostering growth and positive change in the
                            digital landscape.&quot;
                        </blockquote>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
                            Our Team
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member) => (
                                <div
                                    key={member.name}
                                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg text-white">
                                            {member.name}
                                        </h3>
                                        <p className="text-gray-400">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>

            <Footer />
        </>
    );
}
