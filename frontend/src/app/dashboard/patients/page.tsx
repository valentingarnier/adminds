"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { Button } from "@/components/button";
import { Input, InputGroup } from "@/components/input";
import { Badge } from "@/components/badge";
import { EmptyState } from "@/components/empty-state";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
} from "@/components/dropdown";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
} from "lucide-react";

// Format ISO date to French display: "8 mars 2026"
function formatDateFr(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"today" | "all">("all");
  // null = all, true = has report, false = no report
  const [reportFilter, setReportFilter] = useState<boolean | null>(null);

  // Filter patients based on search, date, and report status
  const filteredPatients = useMemo(() => {
    let patients = MOCK_PATIENTS;

    // Search by name (case-insensitive)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      patients = patients.filter(
        (p) =>
          p.firstName.toLowerCase().includes(q) ||
          p.lastName.toLowerCase().includes(q),
      );
    }

    // Filter by today's date
    if (activeFilter === "today") {
      const today = new Date().toISOString().slice(0, 10);
      patients = patients.filter((p) => p.createdAt.startsWith(today));
    }

    // Filter by report status
    if (reportFilter !== null) {
      patients = patients.filter((p) => p.hasReport === reportFilter);
    }

    return patients;
  }, [searchQuery, activeFilter, reportFilter]);

  return (
    <div>
      {/* Header: title + new patient button */}
      <div className="flex items-center justify-between">
        <Heading>Patients</Heading>
        <Button color="indigo" href="#">
          <Plus className="size-4" />
          Nouveau patient
        </Button>
      </div>

      {/* Search bar + filter tabs */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search input with icon */}
        <div className="flex-1">
          <InputGroup>
            <Search data-slot="icon" />
            <Input
              type="search"
              placeholder="Rechercher un patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        {/* Filter tabs: Aujourd'hui / Tous */}
        <div className="flex gap-2">
          {activeFilter === "today" ? (
            <Button color="indigo" onClick={() => setActiveFilter("today")}>
              Aujourd&apos;hui
            </Button>
          ) : (
            <Button outline onClick={() => setActiveFilter("today")}>
              Aujourd&apos;hui
            </Button>
          )}
          {activeFilter === "all" ? (
            <Button color="indigo" onClick={() => setActiveFilter("all")}>
              Tous
            </Button>
          ) : (
            <Button outline onClick={() => setActiveFilter("all")}>
              Tous
            </Button>
          )}
        </div>

        {/* Report status filter dropdown */}
        <Dropdown>
          <DropdownButton outline>
            <Filter className="size-4" />
            {reportFilter === null
              ? "Statut"
              : reportFilter
                ? "Rapport généré"
                : "Sans rapport"}
          </DropdownButton>
          <DropdownMenu>
            <DropdownItem onClick={() => setReportFilter(null)}>
              Tous
            </DropdownItem>
            <DropdownItem onClick={() => setReportFilter(true)}>
              Rapport généré
            </DropdownItem>
            <DropdownItem onClick={() => setReportFilter(false)}>
              Sans rapport
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Date navigation — only when "Aujourd'hui" filter is active */}
      {activeFilter === "today" && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button plain>
            <ChevronLeft className="size-4" />
          </Button>
          <Text className="font-medium">
            {formatDateFr(new Date().toISOString())}
          </Text>
          <Button plain>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Patient cards list */}
      {filteredPatients.length > 0 ? (
        <div className="mt-6 space-y-3">
          {filteredPatients.map((patient) => (
            <Link
              key={patient.id}
              href={`/dashboard/patients/${patient.id}`}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-indigo-200"
            >
              {/* Name + birth date */}
              <div className="flex flex-1 items-baseline gap-3 min-w-0">
                <span className="font-medium text-zinc-900">
                  {patient.lastName} {patient.firstName}
                </span>
                <span className="text-sm text-zinc-400">
                  {formatDateFr(patient.dateOfBirth)}
                </span>
              </div>

              {/* Document count */}
              <span className="text-sm text-zinc-400">
                {patient.documentsCount} doc
                {patient.documentsCount !== 1 ? "s" : ""}
              </span>

              {/* Report badge — only shown when a report has been generated */}
              {patient.hasReport && (
                <Badge color="green">Rapport généré</Badge>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="Aucun patient"
            description={
              searchQuery || reportFilter !== null
                ? "Aucun patient ne correspond à vos critères de recherche."
                : "Créez votre premier dossier patient pour commencer."
            }
            icon={Users}
            action={{ label: "Nouveau patient", href: "#" }}
          />
        </div>
      )}
    </div>
  );
}
