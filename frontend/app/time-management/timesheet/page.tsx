"use client";

import Link from "next/link";

export default function TimesheetPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* Back */}
          <div className="mb-6">
            <Link
              href="/time-management"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              &larr; Back to Time Management
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            My Timesheet
          </h2>

          {/* GRID LIKE DASHBOARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Current Shift Box */}
            <Link href={'./timesheet/shift'}>
            <DashboardCard
              title="Current Shift"
              description="View today's assigned shift details"
              icon="🕒"
            />            
            </Link>


            {/* Holidays Box */}
            <Link href={'./timesheet/holidays'}>
            <DashboardCard
              title="Holidays"
              description="View your available holidays and requests"
              icon="🏖️"
            />            
            </Link>


          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
