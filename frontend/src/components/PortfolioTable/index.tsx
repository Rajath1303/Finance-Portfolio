import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Portfolio } from "@/app/page";

const columnHelper = createColumnHelper<Portfolio>();

const columns = [
  columnHelper.accessor("particulars", { header: "Particulars(Stock Name)" }),
  columnHelper.accessor("purchase_price", { header: "Purchase Price" }),
  columnHelper.accessor("qty", { header: "Quantity" }),
  columnHelper.accessor("investment", { header: "Investment" }),
  columnHelper.accessor("exchange_code", { header: "Stock Exchange Code" }),
  columnHelper.accessor("cmp", { header: "CMP" }),
  columnHelper.accessor("present_value", { header: "Present Value" }),
  columnHelper.accessor("gain_by_loss", {
    header: "Gain/Loss",
    cell: (info) => {
      const value = info.getValue();
      return (
        <span
          className={`font-semibold ${
            value >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{value.toFixed(2)}
        </span>
      );
    },
  }),
  columnHelper.accessor("pe_ratio", { header: "PE" }),
  columnHelper.accessor("eps", {
    header: "Latest Earnings",
    cell: (info) => info.getValue() ?? "-",
  }),
];

export default function PortfolioTable({ data }: { data?: Portfolio[] }) {
  if (!data)
    return (
      <div className="w-lvw h-lvh flex flex-col items-center justify-center">
        <div>Loading..</div>
        <div>This might take up to 2 mins</div>
      </div>
    );
  const grouped = data.reduce<Record<string, Portfolio[]>>((acc, item) => {
    const sector = item.sector || "Others";

    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(item);

    return acc;
  }, {});

  return (
    <div className="p-6 space-y-10">
      {Object.entries(grouped).map(([sector, sectorData]) => {
        const table = useReactTable({
          data: sectorData,
          columns,
          getCoreRowModel: getCoreRowModel(),
        });

        return (
          <div key={sector}>
            <div className="mb-4 text-lg font-bold bg-gray-100 px-4 py-2 rounded-lg">
              {sector}
            </div>
            <div className="max-h-[50vh] overflow-y-auto overflow-x-auto rounded-md shadow-xl border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-900 text-white sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-4 text-left font-medium tracking-wide"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody className="bg-white">
                  {table.getRowModel().rows.map((row) => {
                    const gainLoss = row.original.gain_by_loss;

                    return (
                      <tr
                        key={row.id}
                        className={`border-b last:border-none transition
                        ${
                          gainLoss >= 0
                            ? "bg-green-50 hover:bg-green-100"
                            : "bg-red-50 hover:bg-red-100"
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
