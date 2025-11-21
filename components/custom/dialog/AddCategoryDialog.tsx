"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  slug: z.string().trim().min(1, "Slug is required").max(50, "Slug must be less than 50 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  description: z.string().trim().max(200, "Description must be less than 200 characters").optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format").optional().or(z.literal("")),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCategoryDialog({ open, onOpenChange }: AddCategoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      color: "#5DD8C1",
    },
  });

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    form.setValue("slug", slug);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to save category
      console.log("Category data:", data);
      toast.success("Category added successfully");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Category</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new category to organize your content.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Faith & Belief" 
                      className="bg-background border-border text-foreground"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleNameChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Slug *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="faith-belief" 
                      className="bg-background border-border text-foreground font-mono text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of this category..." 
                      className="bg-background border-border text-foreground resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input 
                        type="color"
                        className="w-20 h-10 p-1 bg-background border-border cursor-pointer"
                        {...field} 
                      />
                      <Input 
                        type="text"
                        placeholder="#5DD8C1" 
                        className="flex-1 bg-background border-border text-foreground font-mono"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="border-border"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Adding..." : "Add Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
