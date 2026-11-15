from pydantic import BaseModel, ConfigDict, Field, EmailStr, field_validator

class User(BaseModel):
    """..."""

    name:   str = Field(
        min_length=2, 
        max_length=100
    )
    email:  EmailStr
    age:    int = Field(ge=0, le=120)
    active: bool

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Name cannot be empty")

        return value


class UserUpdate(BaseModel):
    """..."""

    name:   str | None = Field(
        default=None,
        min_length=2,
        max_length=100
    )
    email:  EmailStr | None = None
    age:    int | None = Field(
        default=None,
        ge=0,
        le=120
    )
    active: bool | None = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str | None) -> str | None:
        """..."""

        if value is not None:
            value = value.strip()

            if not value:
                raise ValueError("Name cannot be empty")

        return value

    @field_validator("name", "email", "age", "active")
    @classmethod
    def reject_null(
        cls,
        value: str | int | bool | None
    ) -> str | int | bool:
        """..."""

        if value is None:
            raise ValueError("Field cannot be null")

        return value


class UserResponse(User):
    """..."""
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )

