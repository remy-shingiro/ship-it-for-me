"use client";

import Image from "next/image";
import { useEffect, useRef, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

export type SelectedProductImage = { id: string; file: File; previewUrl: string };
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileBytes = 5 * 1024 * 1024;
const maxImages = 5;

type ImagePickerProps = {
  images: SelectedProductImage[];
  error?: string;
  onAdd: (images: SelectedProductImage[]) => void;
  onRemove: (id: string) => void;
  onError: (message: string) => void;
};

export function ImagePicker({ images, error, onAdd, onRemove, onError }: ImagePickerProps) {
  const activeUrls = useRef(new Set<string>());

  useEffect(() => () => {
    for (const url of activeUrls.current) URL.revokeObjectURL(url);
    activeUrls.current.clear();
  }, []);

  function handleSelection(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const accepted: SelectedProductImage[] = [];
    const issues: string[] = [];
    let slots = Math.max(0, maxImages - images.length);

    for (const file of Array.from(input.files ?? [])) {
      if (!allowedTypes.has(file.type)) {
        issues.push(`${file.name}: choose a JPG, PNG or WebP image.`);
      } else if (file.size > maxFileBytes) {
        issues.push(`${file.name}: image must be 5 MB or smaller.`);
      } else if (slots === 0) {
        issues.push(`You can select up to ${maxImages} images.`);
        break;
      } else {
        const previewUrl = URL.createObjectURL(file);
        activeUrls.current.add(previewUrl);
        accepted.push({ id: previewUrl, file, previewUrl });
        slots -= 1;
      }
    }

    if (accepted.length) onAdd(accepted);
    onError(issues.join(" "));
    input.value = "";
  }

  function removeImage(image: SelectedProductImage) {
    URL.revokeObjectURL(image.previewUrl);
    activeUrls.current.delete(image.previewUrl);
    onRemove(image.id);
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-foreground">Product images <span className="font-normal text-muted">(optional)</span></span>
      <p className="m-0 text-sm leading-6 text-muted" id="product-images-hint">
        Add up to 5 JPG, PNG or WebP images, 5 MB each. They stay on this device in this preview.
      </p>
      <input
        accept="image/jpeg,image/png,image/webp"
        aria-describedby={error ? "product-images-hint product-images-error" : "product-images-hint"}
        aria-invalid={error ? true : undefined}
        className="peer sr-only"
        id="product-images"
        multiple
        onChange={handleSelection}
        type="file"
      />
      <label className="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center rounded-control border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary" htmlFor="product-images">
        Choose images
      </label>
      {error ? <p className="m-0 text-sm text-error" id="product-images-error">{error}</p> : null}
      {images.length ? (
        <ul aria-label="Selected product images" className="mt-2 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
          {images.map((image) => (
            <li className="min-w-0 rounded-control border border-border bg-surface p-2" key={image.id}>
              <Image alt={`Preview of ${image.file.name}`} className="aspect-square w-full rounded-control object-cover" height={160} src={image.previewUrl} unoptimized width={160} />
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="min-w-0 break-all text-xs text-muted">{image.file.name}</span>
                <Button aria-label={`Remove ${image.file.name}`} className="min-h-10 shrink-0 px-3 py-2 text-xs" onClick={() => removeImage(image)} type="button" variant="ghost">
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
