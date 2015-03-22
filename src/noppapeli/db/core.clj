(ns noppapeli.db.core
  (:require
    [yesql.core :refer [defqueries]]))

(def db-spec
  (or (System/getenv "DATABASE_URL")
  {:subprotocol "postgresql"
   :subname "//localhost/noppapeli"
   :user "db_user_name_here"
   :password "db_user_password_here"}))

(defqueries "sql/queries.sql" {:connection db-spec})
