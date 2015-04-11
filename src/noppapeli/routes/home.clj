(ns noppapeli.routes.home
  (:require [noppapeli.layout :as layout]
            [compojure.core :refer [defroutes GET]]
            [clojure.java.io :as io]
            [noppapeli.db.core :as db]))

(defn update-highscore-list
  [entry highscores]
  (let [{:keys [name score]} entry
        lst (last highscores)]
    (if-let [id (:id (some #(if (> score (% :score)) %) highscores))]
      (let [new-scores (conj (drop-last highscores) entry )]
        (map-indexed (fn [idx item] (assoc item :id (inc idx))) (sort-by :score > new-scores)))
      highscores)))

(defn home-page []
  (layout/render
    "home.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn about-page []
  (layout/render "about.html"))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/highscores" [] { :body (into #{} (db/get-highscores)) }))
