from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_db
from models import User as UserModel
from schemas import  User, UserResponse, UserUpdate

from sqlalchemy.exc import IntegrityError



router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "",
    response_model=list[UserResponse],
    status_code=status.HTTP_200_OK
)
def get_users(
    limit: int = 10,
    active: bool | None = None,
    db: Session = Depends(get_db)
) -> list[UserModel]:
    """..."""

    statement = select(UserModel)

    if active is not None:
        statement = statement.where(
            UserModel.active == active
        )

    statement = statement.limit(limit)

    users = db.scalars(statement).all()

    return users



@router.post(
    "",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def create_user(
    user: User,
    db: Session = Depends(get_db)
):
    """..."""
    
    new_user = UserModel(
        **user.model_dump()
    )

    db.add(new_user)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    db.refresh(new_user)

    return new_user



@router.get(
    "/{user_id}", 
    response_model=UserResponse
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    """..."""

    user = db.get(UserModel, user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user



@router.put(
    "/{user_id}",
    response_model=UserResponse
)
def update_user(
    user_id: int,
    user: User,
    db: Session = Depends(get_db)
):
    """..."""

    existing_user = db.get(UserModel, user_id)

    if existing_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    for field, value in user.model_dump().items():
        setattr(existing_user, field, value)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists"
        )

    db.refresh(existing_user)

    return existing_user





@router.patch(
    "/{user_id}",
    response_model=UserResponse
)
def partial_update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db)
): 

    existing_user = db.get(UserModel, user_id)

    if existing_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    update_data = user.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(existing_user, field, value)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    db.refresh(existing_user)

    return existing_user



@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):

    existing_user = db.get(UserModel, user_id)

    if existing_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(existing_user)

    db.commit()

