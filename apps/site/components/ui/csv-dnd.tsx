'use client'

/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, DragEvent, FC, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import Papa from "papaparse";

export interface CsvDragNDropProps {
  placeholder: string;
  onFileUpload: (data: string[][] | null) => void;
  value?: string[][] | null;
}

export const CsvDnD: FC<CsvDragNDropProps> = ({
  onFileUpload,
  value,
  placeholder,
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const id = useId();

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const fileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    loadFile(file);
  };
  
  const loadFile = async (file?: File) => {
    if (!file) return;

    // get the content with papaparse

    Papa.parse(file, {
      complete: function (results: any) {
        // console.log("Finished:", results.data);
        onFileUpload(results.data);
      },
    });
  };
  //permet de récup fichiers dans DocumentUploadCard
  
  const fileUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    // max file size 10mb
    const maxFileSize = 10 * 1024 * 1024;
    // alert if a file is too big
    if (e.target.files && e.target.files[0].size > maxFileSize) {
      // alert({t("alertMessageFile")});
      return;
    }
    const file = e.target.files?.[0];
    loadFile(file);
  };

  return (
    <div className="group relative ">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <div className="flex justify-center rounded-xl border border-dashed border-gray-300 p-3 bg-background mb-4">
          {value.length ? <>Vous avez chargé {value?.length} lignes</> : null}
          <Button
            size="sm"
            type="button"
            onClick={() => onFileUpload(null)}
            className="absolute top-4 right-4 "
          >
            <Trash size={20} />
          </Button>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "flex justify-center rounded-xl border border-dashed  border-gray-300 p-3 bg-background",
              isDraggedOver ? "" : ""
            )}
          >
            <div
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              className="flex flex-col items-center p-2"
            >
              <span className="text-center">{placeholder}</span>
              <span>Ou</span>
              <label
                className="cursor-pointer rounded  text-center underline group-hover:shadow-xl"
                htmlFor={id}
              >
                Cliquer pour sélectionner
              </label>
              <input
                id={id}
                accept={"application/csv"}
                type="file"
                className="sr-only"
                onChange={e => {
                  if (e.target.files?.[0]!) {
                    fileUploaded(e);
                  }
                }}
              />
            </div>
          </div>
          <div
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            className="absolute inset-0 cursor-pointer"
            onClick={e => {
              e.preventDefault();
              document?.getElementById(id)?.click();
            }}
          ></div>
        </>
      )}
    </div>
  );
};
