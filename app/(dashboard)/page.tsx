import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/db';
import Link from 'next/link';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string; status: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const status = searchParams.status ?? 'all';
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset),
    status
  );

  return (
    <Tabs defaultValue={status}>
      <div className="flex items-center">
        {/* <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList> */}
        <TabsList>
          {['all', 'active', 'inactive', 'archived'].map((s) => (
            <TabsTrigger key={s} value={s} asChild>
              <Link href={`/?status=${s}`}>
                {s[0].toUpperCase() + s.slice(1)}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={status}>
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
          status={status}
        />
      </TabsContent>
    </Tabs>
  );
}
