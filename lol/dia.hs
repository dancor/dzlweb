dia [[]] = [[]]
dia (topRow:restRows) = zipWith (:) diaLeft $ [[]] ++ diaInner ++ [[]] where
  diaLeft = reverse topRow ++ restHeads
  diaInner = dia restTails
  (restHeads, restTails) = unzip $ map (\ (x:xs) -> (x, xs)) restRows

p ls = mapM_ putStrLn ls >> putStrLn ""

main = do 
  p $ dia [
    "HE", 
    "WO"
    ]     
  p $ dia [
    "HELLO",
    "WORLD",
    "EIRCH",
    "EOIEO",
    "ZYTNH"
    ]
