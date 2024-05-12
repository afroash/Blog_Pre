"""Fix date_added default function

Revision ID: 13afeb198861
Revises: 64e636c53d65
Create Date: 2024-05-12 20:34:49.831470

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '13afeb198861'
down_revision = '64e636c53d65'

def upgrade():
    # Use 'alter_column' to change the default on the existing 'date_added' column
    op.alter_column('posts', 'date_added',
                    existing_type=sa.DateTime(timezone=True),
                    server_default=sa.func.current_timestamp(()),
                    existing_nullable=True)

def downgrade():
    op.alter_column('posts', 'date_added',
                    existing_type=sa.DateTime(timezone=True),
                    server_default=None,
                    existing_nullable=True)
