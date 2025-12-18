"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/app/(system)/context/authContext";

export default interface TimeExceptions {
  _id: string;
  employeeId: string | {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  attendanceRecord: string;
  reason: string;
  status: "SUBMITTED" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "ESCALATED";
  type: "MISSED_PUNCH" | "LATE" |"EARLY_LEAVE"| "SHORT_TIME"| "OVERTIME_REQUEST" | "MANUAL_ADJUSTMENT";
  createdAt: Date;
  updatedAt: Date;
  assignedTo: string;
}

export function TimeExceptionsPage() {
}