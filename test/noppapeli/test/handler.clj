(ns noppapeli.test.handler
  (:use clojure.test
        ring.mock.request
        noppapeli.handler
        noppapeli.routes.home))

(def highscores [{:name "A" :score 10 :id 1}
                 {:name "B" :score 9 :id 2}
                 {:name "C" :score 8 :id 3}
                 {:name "D" :score 7 :id 4}
                 {:name "E" :score 6 :id 5}])

(deftest test-app
  (testing "main route"
    (let [response (app (request :get "/"))]
      (is (= 200 (:status response)))))

  (testing "not-found route"
    (let [response (app (request :get "/invalid"))]
      (is (= 404 (:status response))))))

(deftest test-save-highscores
  (testing "update highscores should not modify the list"
    (let [result (update-highscore-list {:name "X" :score 5} highscores)]
      (is (= highscores result))))

  (testing "update highscores with score equal to last score"
    (let [result (update-highscore-list {:name "X" :score 6} highscores)]
      (is (= highscores result))))

  (testing "update highscores with score equal first"
    (let [result (update-highscore-list {:name "X" :score 10} highscores)]
      (is (= [{:name "X" :score 10 :id 1}
              {:name "A" :score 10 :id 2}
              {:name "B" :score 9 :id 3}
              {:name "C" :score 8 :id 4}
              {:name "D" :score 7 :id 5}]
             result))))

  (testing "update highscores with score higher than first"
    (let [result (update-highscore-list {:name "X" :score 11} highscores)]
      (is (= [{:name "X" :score 11 :id 1}
              {:name "A" :score 10 :id 2}
              {:name "B" :score 9 :id 3}
              {:name "C" :score 8 :id 4}
              {:name "D" :score 7 :id 5}]
             result)))))



