"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinHouse, User } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";


const formSchema = z.object({
    destination: z.string().min(1, "Destination is required"),
    checkInDate: z.date().refine(val => val instanceof Date, {
        message: "Check-in date is required",
    }),
    checkOutDate: z.date().refine(val => val instanceof Date, {
        message: "Check-out date is required",
    }),
    guests: z
        .number()
        .min(1, "At least one guest is required")
        .max(10, "Maximum 10 guests allowed")
        .refine((val) => val !== undefined && !isNaN(val), {
            message: "Guests is required and must be a number",
    }),
});

export function SearchHotelForm() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            destination: "",
            checkInDate: undefined,
            checkOutDate: undefined,
            guests: undefined,
        },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formvalues = {
        ...values,
        checkInDate: format(values.checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(values.checkOutDate, 'yyyy-MM-dd'),
    }
    // console.log("Submitted values:", formvalues.checkInDate);
    navigate({ to: '/hotels', search: formvalues as any })
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-700 bg-white p-2 rounded-lg space-y-2">
        <div className="grid gap-4 sm:grid-cols-4 p-4">
            <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="block text-center">Destination</FormLabel>
                <FormControl>
                    <div className="relative">
                        <MapPinHouse className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Where to?"
                            className={`pl-10 ${form.formState.errors.destination ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                            {...field}
                        />
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
            
            <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel className="block text-center">Check In</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                            {field.value ? format(field.value, "PP") : "Pick a date"}
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                        />
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="checkOutDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel className="block text-center">Check Out</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                            {field.value ? format(field.value, "PP") : "Pick a date"}
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                        />
                        </PopoverContent>
                    </Popover>
                    </FormItem>
                )}
            />
            <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="block text-center">Guests</FormLabel>
                <FormControl>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <Input
                            type="number"
                            placeholder="1"
                            min={1}
                            max={10}
                            value={field.value ?? ""}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") {
                                    field.onChange(undefined);
                                } else {
                                    field.onChange(Number(val));
                                }
                            }}
                            className={`pl-10 ${form.formState.errors.guests ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        />
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" className="text-gray-600 w-full bg-gradient-to-r from-blue-200 to-yellow-200">Search Hotels</Button>
        {Object.keys(form.formState.errors).length > 0 && (
            <p className="text-sm text-red-500 font-medium">Invalid input</p>
        )}   
    </form>
    </Form>
  );
}
