'use client';

export default function ChartSkeleton() {
  return (
    <div className="h-56 w-full animate-pulse">
      <div className="flex h-full items-end justify-between gap-2 px-4">
        {/* Animated bars */}
        {[65, 45, 80, 55, 70, 60, 85, 50, 75, 65, 90, 70].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-lg bg-linear-to-t from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600"
            style={{
              height: `${height}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
          style={{ animationDelay: '0.2s' }}
        />
      </div>
    </div>
  );
}
