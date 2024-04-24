import { Component, OnInit } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from "@angular/common";

interface Day {
  dayOfMonth: number;
  isOtherMonth: boolean;
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
  standalone: true,
  imports: [IonIcon, CommonModule],
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: string = this.currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dates: number[] = [];
  notes: { date: number; month: number; year: number }[] = [
    { date: 10, month: 11, year: 2023 },
    { date: 7, month: 12, year: 2023 },
    { date: 15, month: 12, year: 2023 },
    // Add more notes as needed
  ];

  hasNotes(date: number): boolean {
    const currentMonth = this.currentDate.getMonth() + 1;
    const currentYear = this.currentDate.getFullYear();

    return this.notes.some((note) => {
      return (
        note.date === date &&
        note.month === currentMonth &&
        note.year === currentYear
      );
    });
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const daysInMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0,
    ).getDate();
    const firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1,
    ).getDay();

    this.dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // if (firstDayOfMonth > 0) {
    //   const previousMonthDays = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    //   for (let i = 0; i < firstDayOfMonth; i++) {
    //     this.dates.unshift(previousMonthDays - i);
    //   }
    // }
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.dates.unshift(0);
    }

    // const totalDays = this.dates.length;
    // const nextMonthDays = 7 - (totalDays % 7);
    // if (nextMonthDays < 7) {
    //   for (let i = 0; i < nextMonthDays; i++) {
    //     this.dates.push(i + 1);
    //   }
    // }
    const totalDays = this.dates.length;
    const nextMonthDays = 7 - (totalDays % 7);
    if (nextMonthDays < 7) {
      for (let i = 0; i < nextMonthDays; i++) {
        this.dates.push(0);
      }
    }
  }

  isDifferentMonth(date: number): boolean {
    return date === 0;
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateMonth();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateMonth();
  }

  updateMonth(): void {
    this.currentMonth = this.currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    this.generateCalendar();
  }

  isToday(date: number): boolean {
    const today = new Date();
    return (
      date === today.getDate() &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }

  isTodayDayName(day: string): boolean {
    const today = new Date();
    return (
      day === this.days[today.getDay()] &&
      this.currentDate.getMonth() === today.getMonth() &&
      this.currentDate.getFullYear() === today.getFullYear()
    );
  }
}
