import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-blue-50 to-lime-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/40 border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xl dark:text-white">Team</span>

            <span className="rounded-lg border-2 border-lime-600 px-2 text-base font-medium text-lime-600 dark:border-lime-500 dark:text-lime-500">
              Ora
            </span>
          </div>

          {session ? (
            <a
              href="/onboarding"
              className="
              px-5 py-2.5
              rounded-xl
              bg-linear-to-r
              from-blue-600
              to-indigo-600
              text-white
              font-medium
              shadow-lg shadow-blue-500/30
              hover:scale-105
              transition
            ">
              Go to App
            </a>
          ) : (
            <div className="flex gap-3">
              <a
                href="/login"
                className="
                px-4 py-2
                rounded-xl
                border border-gray-300
                dark:border-gray-700
                hover:bg-gray-100
                dark:hover:bg-gray-800
                transition
              ">
                Login
              </a>

              <a
                href="/register"
                className="
                px-4 py-2
                rounded-xl
                bg-linear-to-r
                from-blue-600
                to-indigo-600
                text-white
                shadow-lg shadow-blue-500/30
                hover:scale-105
                transition
              ">
                register
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div
          className="
          inline-block
          rounded-full
          px-4 py-2
          text-sm
          bg-lime-100
          text-lime-700
          dark:bg-lime-900/30
          dark:text-lime-400
          mb-6
        ">
          ✨ Modern Team Collaboration Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Manage Your Team,
          <br />
          Project, and Tasks
          <span className="text-blue-600"> Effortlessly</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
          TeamOra helps teams organize projects, assign tasks, manage members,
          review work submissions, and collaborate in one simple platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="
            px-8 py-3 rounded-2xl
            bg-linear-to-r
            from-blue-600 to-indigo-600
            text-white font-semibold
            shadow-xl shadow-blue-500/30
            hover:scale-105 transition">
            Get Started
          </button>

          <button
            className="
            px-8 py-3 rounded-2xl
            border border-gray-300 dark:border-gray-700
            backdrop-blur-xl
            hover:bg-white/40
            dark:hover:bg-gray-800
            transition">
            Learn More
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Project Management',
              desc: 'Create and organize multiple projects inside your workspace.',
              icon: '📁',
            },
            {
              title: 'Task Collaboration',
              desc: 'Assign tasks, review submissions, and track progress easily.',
              icon: '✅',
            },
            {
              title: 'Member Control',
              desc: 'Manage tenant members, project roles, and permissions securely.',
              icon: '👥',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
              rounded-3xl
              p-8
              bg-white/60
              dark:bg-gray-900/60
              backdrop-blur-xl
              border border-gray-200 dark:border-gray-800
              hover:-translate-y-2
              transition
            ">
              <div className="text-4xl">{item.icon}</div>

              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}

      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Why Choose TeamOra?
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold">⚡ Fast</h3>
              <p className="mt-2">Designed to keep your workflow efficient.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold">🎯 Simple</h3>
              <p className="mt-2">
                Clean interface without unnecessary complexity.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">🔒 Secure</h3>
              <p className="mt-2">
                Role-based access to protect your workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Contact Developer</h2>

        <p className="mt-5 text-gray-600 dark:text-gray-400">
          Need collaboration, feedback, or have any questions? Feel free to
          contact the developer.
        </p>

        <div className="mt-8 space-y-2">
          <p>👨‍💻 Developer: Muhammad Abdul Rozaq</p>
          <p>📧 Email: m.abdulrozaq06@gmail.com</p>
          <p>
            🐙 Github: <a>https://github.com/Abdurrozaq63</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className="
        py-6
        border-t
        border-gray-200
        dark:border-gray-800
        text-center
        text-sm
        text-gray-500
      ">
        © 2026 TeamOra. Built with passion for better collaboration.
      </footer>
    </main>
  );
}
