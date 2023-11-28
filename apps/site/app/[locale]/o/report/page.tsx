"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CsvDnD } from "@/components/ui/csv-dnd";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import RepartitionPriceChart from "./repartition-price-chart";

const Report = () => {
  const [csvFile, setCsvFile] = useState<string[][] | null>(null);

  return (
    <>
    <h1 className="text-3xl font-bold tracking-tight ml-6 my-6 self-start">
            Rapport
          </h1>
      {csvFile ? (
        <>
        <Card className="my-4 mx-2">
          <CardHeader className="p-2">
            <CardTitle className="text-center py-2 lg:text-lg lg:my-4">Répartition des véhicules par catégorie en %</CardTitle>
          </CardHeader>
          <CardContent>
          <RepartitionPriceChart csvData={csvFile} />
          </CardContent>
          </Card>
          <Card className=" my-6 mx-2 md:m-2">
            <CardHeader className="p-2">
              <CardTitle className="text-center py-2 lg:text-lg lg:my-4">Rapport Flotte</CardTitle>
            </CardHeader>
            <CardContent className="p-0 max-w-full">
              <Table className="p-0 ">
                <TableHeader>
                  {csvFile[0].map((cell, cellIndex) => (
                    <TableHead className="text-xs p-2 text-center font-bold underline decoration-solid md:text-base" key={cellIndex}>
                      {cell}
                    </TableHead>
                  ))}
                </TableHeader>
                <TableBody>
                  {csvFile.slice(1).map((row, rowIndex) => (
                    <TableRow className="font-medium" key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell className="font-medium p-2 text-center md:w-[30vh] lg:w-[50vh]" key={cellIndex}>
                          {cellIndex === 2
                            ? new Date(cell).toLocaleDateString()
                            : cellIndex === 4
                            ? parseFloat(cell).toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                              })
                            : cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* <pre>{JSON.stringify(csvFile, null, 2)}</pre> */}
        </>
      ) : null}
      <CsvDnD
        placeholder="Faire glisser un fichier"
        onFileUpload={(data) => {
          setCsvFile(data);
        }}
        value={csvFile}
      />
    </>
  );
};


export default Report;
