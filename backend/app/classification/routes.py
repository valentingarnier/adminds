"""Classification + dossier parsing routes."""

from __future__ import annotations

from fastapi import APIRouter, File, UploadFile

from app.classification import services
from app.classification.schemas import (
    ClassifiedDocument,
    DossierResponse,
    PatientDossierPatch,
)

router = APIRouter(tags=["classification"])


@router.post("/classify", response_model=list[ClassifiedDocument])
async def classify(files: list[UploadFile] = File(...)) -> list[ClassifiedDocument]:
    """Classify uploaded files — fast per-file labeling for Step 1 UI badges."""
    return await services.classify_documents(files)


@router.post("/parse-dossier", response_model=DossierResponse)
async def parse_dossier(files: list[UploadFile] = File(...)) -> DossierResponse:
    """Parse all uploaded documents into a structured patient dossier."""
    return await services.parse_and_store_dossier(files)


@router.get("/dossiers/{dossier_id}", response_model=DossierResponse)
async def get_dossier(dossier_id: str) -> DossierResponse:
    """Read the current state of a stored dossier."""
    return services.get_dossier(dossier_id)


@router.patch("/dossiers/{dossier_id}", response_model=DossierResponse)
async def patch_dossier(dossier_id: str, patch: PatientDossierPatch) -> DossierResponse:
    """Partially update a stored dossier (inline edits from the frontend)."""
    return services.patch_dossier(dossier_id, patch)
