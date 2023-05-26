export function PageLoader() {
  return (
    <div className="fixed left-0 top-0 flex w-screen items-center justify-center bg-white h-screen-safe">
      <div className="flex h-20 w-24 items-center justify-center gap-2.5 rounded-3xl bg-ce-purple">
        <span className="h-8 w-2 animate-loader rounded-full bg-white"></span>
        <span className="h-8 w-2 animate-loader2 rounded-full bg-white"></span>
        <span className="h-8 w-2 animate-loader rounded-full bg-white"></span>
      </div>
    </div>
  );
}
