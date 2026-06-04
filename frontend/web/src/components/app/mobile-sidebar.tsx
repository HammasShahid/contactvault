import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Sidebar } from './sidebar';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-2xl lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* <SheetContent side="left" className="w-[300px] p-0"> */}
      <SheetContent side="left" className="w-fit p-0">
        {/* <Sidebar className="hidden lg:flex" /> */}
        <Sidebar className="flex lg:hidden" />
      </SheetContent>
    </Sheet>
  );
}
