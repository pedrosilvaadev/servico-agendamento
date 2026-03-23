import { Loading } from "@/components/shared/loading";

export default function RootLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loading label="Carregando dados da página..." />
    </div>
  );
}
