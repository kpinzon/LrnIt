
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 11/27/2016 16:03:10
-- Generated from EDMX file: C:\Redwood\Projects\Project 2 - Learnt\LrntModel\LrntModel\LrntDatabase.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [LrntDatabase];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_TagUser_Tag]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TagUser] DROP CONSTRAINT [FK_TagUser_Tag];
GO
IF OBJECT_ID(N'[dbo].[FK_TagUser_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TagUser] DROP CONSTRAINT [FK_TagUser_User];
GO
IF OBJECT_ID(N'[dbo].[FK_UserContract_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserContract] DROP CONSTRAINT [FK_UserContract_User];
GO
IF OBJECT_ID(N'[dbo].[FK_UserContract_Contract]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserContract] DROP CONSTRAINT [FK_UserContract_Contract];
GO
IF OBJECT_ID(N'[dbo].[FK_UserConversation_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserConversation] DROP CONSTRAINT [FK_UserConversation_User];
GO
IF OBJECT_ID(N'[dbo].[FK_UserConversation_Conversation]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserConversation] DROP CONSTRAINT [FK_UserConversation_Conversation];
GO
IF OBJECT_ID(N'[dbo].[FK_ConversationMessage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Messages] DROP CONSTRAINT [FK_ConversationMessage];
GO
IF OBJECT_ID(N'[dbo].[FK_MessageUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Messages] DROP CONSTRAINT [FK_MessageUser];
GO
IF OBJECT_ID(N'[dbo].[FK_CategoryTag]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Tags] DROP CONSTRAINT [FK_CategoryTag];
GO
IF OBJECT_ID(N'[dbo].[FK_UserExperience]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Expertises] DROP CONSTRAINT [FK_UserExperience];
GO
IF OBJECT_ID(N'[dbo].[FK_UserConversation1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Conversations] DROP CONSTRAINT [FK_UserConversation1];
GO
IF OBJECT_ID(N'[dbo].[FK_UserConversation2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Conversations] DROP CONSTRAINT [FK_UserConversation2];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Users];
GO
IF OBJECT_ID(N'[dbo].[Tags]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Tags];
GO
IF OBJECT_ID(N'[dbo].[Contracts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Contracts];
GO
IF OBJECT_ID(N'[dbo].[Conversations]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Conversations];
GO
IF OBJECT_ID(N'[dbo].[Messages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Messages];
GO
IF OBJECT_ID(N'[dbo].[Categories]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Categories];
GO
IF OBJECT_ID(N'[dbo].[Expertises]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Expertises];
GO
IF OBJECT_ID(N'[dbo].[TagUser]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TagUser];
GO
IF OBJECT_ID(N'[dbo].[UserContract]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserContract];
GO
IF OBJECT_ID(N'[dbo].[UserConversation]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserConversation];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Fname] nvarchar(max)  NOT NULL,
    [Lname] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL,
    [Phone] nvarchar(max)  NOT NULL,
    [Username] nvarchar(max)  NOT NULL,
    [Password] nvarchar(max)  NOT NULL,
    [IsBanned] bit  NULL,
    [Bio] nvarchar(max)  NULL,
    [Image] nvarchar(max)  NULL,
    [HourlyRate] decimal(18,0)  NULL,
    [IsTeacher] bit  NULL,
    [Headline] nvarchar(max)  NULL
);
GO

-- Creating table 'Tags'
CREATE TABLE [dbo].[Tags] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [CategoryId] int  NOT NULL
);
GO

-- Creating table 'Contracts'
CREATE TABLE [dbo].[Contracts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IsAccepted] bit  NOT NULL,
    [Rate] int  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [Owner] int  NOT NULL
);
GO

-- Creating table 'Conversations'
CREATE TABLE [dbo].[Conversations] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [TimeCreated] datetime  NOT NULL,
    [Subject] nvarchar(max)  NOT NULL,
    [RecipientId] int  NOT NULL,
    [SenderId] int  NOT NULL
);
GO

-- Creating table 'Messages'
CREATE TABLE [dbo].[Messages] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Text] nvarchar(max)  NOT NULL,
    [TimeSent] datetime  NOT NULL,
    [IsRead] bit  NOT NULL,
    [ConversationId] int  NOT NULL,
    [UserId] int  NOT NULL
);
GO

-- Creating table 'Categories'
CREATE TABLE [dbo].[Categories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NULL
);
GO

-- Creating table 'Expertises'
CREATE TABLE [dbo].[Expertises] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [YearsExperience] int  NOT NULL,
    [UserId] int  NOT NULL
);
GO

-- Creating table 'TagUser'
CREATE TABLE [dbo].[TagUser] (
    [Tags_Id] int  NOT NULL,
    [Users_Id] int  NOT NULL
);
GO

-- Creating table 'UserContract'
CREATE TABLE [dbo].[UserContract] (
    [Users_Id] int  NOT NULL,
    [Contracts_Id] int  NOT NULL
);
GO

-- Creating table 'UserConversation'
CREATE TABLE [dbo].[UserConversation] (
    [Users_Id] int  NOT NULL,
    [Conversations_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Tags'
ALTER TABLE [dbo].[Tags]
ADD CONSTRAINT [PK_Tags]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Contracts'
ALTER TABLE [dbo].[Contracts]
ADD CONSTRAINT [PK_Contracts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Conversations'
ALTER TABLE [dbo].[Conversations]
ADD CONSTRAINT [PK_Conversations]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Messages'
ALTER TABLE [dbo].[Messages]
ADD CONSTRAINT [PK_Messages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Categories'
ALTER TABLE [dbo].[Categories]
ADD CONSTRAINT [PK_Categories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Expertises'
ALTER TABLE [dbo].[Expertises]
ADD CONSTRAINT [PK_Expertises]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Tags_Id], [Users_Id] in table 'TagUser'
ALTER TABLE [dbo].[TagUser]
ADD CONSTRAINT [PK_TagUser]
    PRIMARY KEY CLUSTERED ([Tags_Id], [Users_Id] ASC);
GO

-- Creating primary key on [Users_Id], [Contracts_Id] in table 'UserContract'
ALTER TABLE [dbo].[UserContract]
ADD CONSTRAINT [PK_UserContract]
    PRIMARY KEY CLUSTERED ([Users_Id], [Contracts_Id] ASC);
GO

-- Creating primary key on [Users_Id], [Conversations_Id] in table 'UserConversation'
ALTER TABLE [dbo].[UserConversation]
ADD CONSTRAINT [PK_UserConversation]
    PRIMARY KEY CLUSTERED ([Users_Id], [Conversations_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Tags_Id] in table 'TagUser'
ALTER TABLE [dbo].[TagUser]
ADD CONSTRAINT [FK_TagUser_Tag]
    FOREIGN KEY ([Tags_Id])
    REFERENCES [dbo].[Tags]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Users_Id] in table 'TagUser'
ALTER TABLE [dbo].[TagUser]
ADD CONSTRAINT [FK_TagUser_User]
    FOREIGN KEY ([Users_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TagUser_User'
CREATE INDEX [IX_FK_TagUser_User]
ON [dbo].[TagUser]
    ([Users_Id]);
GO

-- Creating foreign key on [Users_Id] in table 'UserContract'
ALTER TABLE [dbo].[UserContract]
ADD CONSTRAINT [FK_UserContract_User]
    FOREIGN KEY ([Users_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Contracts_Id] in table 'UserContract'
ALTER TABLE [dbo].[UserContract]
ADD CONSTRAINT [FK_UserContract_Contract]
    FOREIGN KEY ([Contracts_Id])
    REFERENCES [dbo].[Contracts]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserContract_Contract'
CREATE INDEX [IX_FK_UserContract_Contract]
ON [dbo].[UserContract]
    ([Contracts_Id]);
GO

-- Creating foreign key on [Users_Id] in table 'UserConversation'
ALTER TABLE [dbo].[UserConversation]
ADD CONSTRAINT [FK_UserConversation_User]
    FOREIGN KEY ([Users_Id])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Conversations_Id] in table 'UserConversation'
ALTER TABLE [dbo].[UserConversation]
ADD CONSTRAINT [FK_UserConversation_Conversation]
    FOREIGN KEY ([Conversations_Id])
    REFERENCES [dbo].[Conversations]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserConversation_Conversation'
CREATE INDEX [IX_FK_UserConversation_Conversation]
ON [dbo].[UserConversation]
    ([Conversations_Id]);
GO

-- Creating foreign key on [ConversationId] in table 'Messages'
ALTER TABLE [dbo].[Messages]
ADD CONSTRAINT [FK_ConversationMessage]
    FOREIGN KEY ([ConversationId])
    REFERENCES [dbo].[Conversations]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ConversationMessage'
CREATE INDEX [IX_FK_ConversationMessage]
ON [dbo].[Messages]
    ([ConversationId]);
GO

-- Creating foreign key on [UserId] in table 'Messages'
ALTER TABLE [dbo].[Messages]
ADD CONSTRAINT [FK_MessageUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_MessageUser'
CREATE INDEX [IX_FK_MessageUser]
ON [dbo].[Messages]
    ([UserId]);
GO

-- Creating foreign key on [CategoryId] in table 'Tags'
ALTER TABLE [dbo].[Tags]
ADD CONSTRAINT [FK_CategoryTag]
    FOREIGN KEY ([CategoryId])
    REFERENCES [dbo].[Categories]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CategoryTag'
CREATE INDEX [IX_FK_CategoryTag]
ON [dbo].[Tags]
    ([CategoryId]);
GO

-- Creating foreign key on [UserId] in table 'Expertises'
ALTER TABLE [dbo].[Expertises]
ADD CONSTRAINT [FK_UserExperience]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserExperience'
CREATE INDEX [IX_FK_UserExperience]
ON [dbo].[Expertises]
    ([UserId]);
GO

-- Creating foreign key on [RecipientId] in table 'Conversations'
ALTER TABLE [dbo].[Conversations]
ADD CONSTRAINT [FK_UserConversation1]
    FOREIGN KEY ([RecipientId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserConversation1'
CREATE INDEX [IX_FK_UserConversation1]
ON [dbo].[Conversations]
    ([RecipientId]);
GO

-- Creating foreign key on [SenderId] in table 'Conversations'
ALTER TABLE [dbo].[Conversations]
ADD CONSTRAINT [FK_UserConversation2]
    FOREIGN KEY ([SenderId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserConversation2'
CREATE INDEX [IX_FK_UserConversation2]
ON [dbo].[Conversations]
    ([SenderId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------