import Link from "next/link";

export function Features2() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              New Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Faster iteration. More innovation.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The platform for rapid progress. Let your team focus on shipping
              features instead of managing infrastructure with automated CI/CD,
              built-in testing, and integrated collaboration.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
          <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="310"
            src="/placeholder.svg"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Collaboration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Make collaboration seamless with built-in code review tools.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Automation</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Automate your workflow with continuous integration.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Scale</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Deploy to the cloud with a single click and scale with ease.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              New Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Faster iteration. More innovation.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The platform for rapid progress. Let your team focus on shipping
              features instead of managing infrastructure with automated CI/CD,
              built-in testing, and integrated collaboration.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">
              Infinite scalability, zero config
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enable code to run on-demand without needing to manage your own
              infrastructure or upgrade hardware.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">
              Real-time insights and controls
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get granular, first-party, real-user metrics on site performance
              per deployment.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Personalization at the edge</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Deliver dynamic, personalized content, while ensuring users only
              see the best version of your site.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">
              Real-time insights and controls
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get granular, first-party, real-user metrics on site performance
              per deployment.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">Personalization at the edge</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Deliver dynamic, personalized content, while ensuring users only
              see the best version of your site.
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-bold">
              Infinite scalability, zero config
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enable code to run on-demand without needing to manage your own
              infrastructure or upgrade hardware.
            </p>
          </div>
        </div>
        <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Contact Sales
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Tour the Platform
          </Link>
        </div>
      </div>
    </section>
  );
}
