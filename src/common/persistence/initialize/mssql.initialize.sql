IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'kodoti_wallet')
  BEGIN
    CREATE DATABASE [DataBase]
  END
GO

USE [kodoti_wallet]
GO
/****** Object:  Table [dbo].[auth_user]    Script Date: 7/07/2020 01:28:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) UNIQUE NOT NULL,
	[password] [varchar](100) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
 CONSTRAINT [PK_auth_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO