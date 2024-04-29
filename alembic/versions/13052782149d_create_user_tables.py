"""create user tables

Revision ID: 13052782149d
Revises: 8c6b4934e6ed
Create Date: 2024-04-27 19:53:44.185587

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '13052782149d'
down_revision: Union[str, None] = '8c6b4934e6ed'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
