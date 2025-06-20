import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const searchSchema = z.object({
  query: z.string().min(1, "Digite algo para buscar"),
});

type SearchSchema = z.infer<typeof searchSchema>;

export function SearchForm() {
  const navigate = useNavigate();

  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  function handleSearch(search: z.infer<typeof searchSchema>) {
    navigate(`/search?filter=${encodeURIComponent(search.query)}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSearch)}
        className={cn("w-full md:w-[250px] lg:w-[400px]")}
      >
        <div className=" flex items-center gap-1 border border-[#cacaca] rounded-md px-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="O que deseja?"
                    className=" h-10 w-full text-md bg-white text-black rounded-md border-0 p-0 placeholder:text-[#494949]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <button type="submit" className="cursor-pointer">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </form>
    </Form>
  );
}
